package BulltinPeo.dto;

import BulltinPeo.entity.EntityContrat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoContart {

    private Integer id ;
    private String nameContrat;

    public static DtoContart from_Entity_To_Dto (EntityContrat entity ) {
        return DtoContart
                .builder()
                .id(entity.getId())
                .nameContrat(entity.getNameContrat())
                .build();
    }

}
