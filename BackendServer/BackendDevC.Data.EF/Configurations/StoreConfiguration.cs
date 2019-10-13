using BackendDevC.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BackendDevC.Data.EF.Configurations
{
    public class StoreConfiguration : DbEntityConfiguration<Stores>
    {
        public override void Configure(EntityTypeBuilder<Stores> entity)
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Id).IsRequired()
            .HasColumnType("varchar(50)");
        }
    }
}