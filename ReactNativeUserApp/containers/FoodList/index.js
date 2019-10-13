import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Recommended from "../../components/Recommend";
import { SearchBar } from "react-native-elements";
import { isCloseToBottom } from "../../helper/utils";
import FilterModal from "../../components/FoodList/FilterModal";
import { changeMapRange } from "../../redux/UserRedux";
import {
  getRecommendByUserId,
  getRecommendByUserIdWithPagin
} from "../../redux/RecommedRedux";
import { selecteCate } from "../../redux/CategoryRedux";
import Banner from "../../components/FoodList/Banner";

class ListFood extends React.Component {
  state = {
    refreshing: false,
    filterModalVisible: false
  };

  onRecommendPagination = () => {
    this.props.getRecommendByUserIdPagin();
  };

  onSelectRangeFilter = range => {
    this.props.onRangeChange(range);
  };

  onSelectCateFilter = cate => {
    this.props.selectCate(cate);
  };

  onConfirmFilter = () => {
    this.props.getRecommendByUserId(this.state.cateSelected);
    this.onHandleFilterModal();
  };

  onHandleFilterModal = () => {
    this.setState({ filterModalVisible: !this.state.filterModalVisible });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 500);
  };
  render() {
    const {
      recommend: { recommends },
      onViewDetail,
      recommend,
      category
    } = this.props;
    const { refreshing, filterModalVisible } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: 5 }}>
        <View style={{ flexDirection: "row" }}>
          <SearchBar
            placeholder="Nhà hàng, món ăn, ẩm thực"
            inputContainerStyle={{
              backgroundColor: "rgb(231,234,237)",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center"
            }}
            containerStyle={{
              width: "85%",
              backgroundColor: "white",
              borderBottomColor: "transparent",
              borderTopColor: "transparent"
            }}
          />
          <TouchableOpacity
            onPress={this.onHandleFilterModal}
            style={{
              width: "15%",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
              borderRadius: 40
            }}
          >
            <AntDesign name="filter" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              this.onRecommendPagination();
            }
          }}
          scrollEventThrottle={400}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View style={{ flex: 1, paddingTop: 10 }}>
            <Banner onViewDetail={onViewDetail}/>

            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
              <Text style={{ fontSize: 24, fontWeight: "700" }}>
                Gợi ý dành cho bạn
              </Text>
              {recommends.length > 0 ? (
                recommends.map((r, i) => {
                  return (
                    <Recommended
                      key={i}
                      storeName={r.storeName}
                      avrAmount={r.avrAmount}
                      address={r.storeAddress}
                      img={r.imgUrl}
                      onPress={() => onViewDetail(r, i)}
                    />
                  );
                })
              ) : (
                <Text style={{ textAlign: "center" }}>
                  Không có gợi ý dành cho bạn ở khoảng cách này. Hãy tăng lên
                </Text>
              )}
              {recommend.isLoadingMore && <ActivityIndicator />}
              {recommend.endPage && <Text>Gợi ý dành cho bạn đã hết.</Text>}
            </View>
          </View>
        </ScrollView>
        <FilterModal
          onChangeRange={this.onSelectRangeFilter}
          rangeSelected={this.props.region.latitudeDelta}
          visible={filterModalVisible}
          onClose={this.onHandleFilterModal}
          cate={category}
          onConfirm={this.onConfirmFilter}
          onCateChange={this.onSelectCateFilter}
          cateSelected={category.cateSelected}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    region: state.user.region,
    recommend: state.recommend,
    category: state.category
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRangeChange: range => dispatch(changeMapRange(range)),
    getRecommendByUserId: cate => dispatch(getRecommendByUserId(cate)),
    getRecommendByUserIdPagin: () => dispatch(getRecommendByUserIdWithPagin()),
    selectCate: cate => dispatch(selecteCate(cate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListFood);
