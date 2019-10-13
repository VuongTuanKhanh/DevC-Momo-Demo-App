namespace BackendDevC.Infrastructure.Interfaces
{
    public interface IUnitOfWork
    {
        /// <summary>
        /// Call save change from db context
        /// </summary>
        void Commit();
    }
}