namespace BackendDevC.Infrastructure.Models
{
    public interface IEntityWithTypedId<TId>
    {
        TId Id { get; }
    }
}