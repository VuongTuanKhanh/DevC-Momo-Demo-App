# Data analyze
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Train test split
from sklearn.model_selection import train_test_split

# tensorflow.keras
import tensorflow as tf
import tensorflow.keras.metrics
from tensorflow.keras.layers import Input, Embedding, Concatenate, Dense, Flatten, Dot
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.regularizers import l2

# Pickle
import pickle

# Datetime
from datetime import datetime

# Ignore warning
import warnings
warnings.filterwarnings("ignore")



class modelRecommenderSystem():
    TRAIN_TEST_SIZE = 0.3
    TRAIN_EPOCHS = 1
    TRAIN_RANDOM_STATE = 2019
    REQUIRE_COLUMNS = {'user_code', 'service_code', 'favor'}
    data2train = None
    model = None
    
    def csvFileReadAndCheck(self, file_link):
        df = pd.read_csv(file_link, index_col=0)
        if not self.REQUIRE_COLUMNS.issubset(df.columns):
            print("ERROR: Necessary columns not in dataframe {}".format(self.REQUIRE_COLUMNS))
            print(df.columns)
            return -1
        else:
            print("DONE: File has been read sucessfully")
            self.data2train = df
            return 0
    
    def create(self, from_file=None):
        if from_file is not None:
            ### Code to load existing model here
            return
        df = self.data2train
        def EmbeddedInput(name, n_in, n_out, reg):
            inp = Input(shape=(1,), dtype='int64', name=name)
            return (inp, Embedding(n_in+1, n_out, input_length=1, embeddings_regularizer=l2(reg))(inp))
        n_user = int(df['user_code'].max())
        n_service = int(df['service_code'].max())
        n_dim = 64
        user_in, u = EmbeddedInput('user_in', n_user, n_dim, 1e-4)
        service_in, s = EmbeddedInput('service_in', n_service, n_dim, 1e-4)
        #x = Dot(axes=2, normalize=False)([u, s])
        x = Concatenate()([u, s])
        x = Flatten()(x)
        #x = Dense(32, activation='relu')(x)
        x = Dense(1, activation='sigmoid')(x)
        nn = Model([user_in, service_in], x)
        nn.compile(Adam(0.001), loss='binary_crossentropy', metrics=['accuracy', tf.keras.metrics.Precision(thresholds=0.5), tf.keras.metrics.Recall(thresholds=0.5)])
        self.model = nn

    def training(self):
        df = self.data2train
        #df = df[df['service_group'] == 'fnb']
        #user_freq = df['user_id'].value_counts()
        #new_user = user_freq[user_freq < 4].index
        #df = df[~df['user_id'].isin(new_user)]
        #df.rating = 0
        print(df.rating.value_counts())
        print(df[df['user_id'] == 1].count())
        X_train, X_test, y_train, y_test = train_test_split(df[['user_code', 'service_code']], df['rating'].astype(int),
                                                    test_size=self.TRAIN_TEST_SIZE,
                                                    random_state=self.TRAIN_RANDOM_STATE)
        self.model.fit([X_train['user_code'], X_train['service_code']], y_train,
                        validation_data=([X_test['user_code'], X_test['service_code']], y_test),
                        validation_split=0.5,
                        shuffle=True,
                        epochs=self.TRAIN_EPOCHS)

    def save(self):
        filename = './data/Model_test.h5'
        self.model.save(filename)

    def predict(self, user_id_list):
        with open('./data/userid2code.dict', 'rb') as file:
            userid2code = pickle.load(file)
        with open('./data/usercode2id.dict', 'rb') as file:
            usercode2id = pickle.load(file)    
        with open('./data/serviceid2code.dict', 'rb') as file:
            serviceid2code = pickle.load(file)
        with open('./data/servicecode2id.dict', 'rb') as file:
            servicecode2id = pickle.load(file)
        for user_id in user_id_list:
            user_code = userid2code[user_id]
            data = self.data2train
            data = data['service_id'].unique()
            data = pd.DataFrame(data, columns=['service_id'])
            data['service_code'] = data['service_id'].map(serviceid2code)
            data = data.dropna()
            data['user_code'] = user_code
            y = self.model.predict([data['user_code'], data['service_code']])
            predict = {servicecode2id[sc]:r for sc,r in zip(data['service_code'], y[:,0])}
            predict = sorted(predict.items(), key = lambda x : x[1])

if (__name__ == '__main__'):
    model = modelRecommenderSystem()
    model.csvFileReadAndCheck('./data/transactions2train.csv')
    model.create()
    model.training()
    model.save()
