namespace BackendDevC.Infrastructure.Models
{
    public abstract class EntityBaseWithTypedId<TId> : IEntityWithTypedId<TId>
    {
        public virtual TId Id { get; protected set; }
    }
}