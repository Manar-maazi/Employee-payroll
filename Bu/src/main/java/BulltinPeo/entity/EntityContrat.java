package BulltinPeo.entity;

import BulltinPeo.dto.DtoContart;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table (name="Contrat")
public class EntityContrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String nameContrat;

    @OneToMany( mappedBy="contrat",cascade = CascadeType.ALL)
    //private List<EmpEntity> empList = new ArrayList<>();

    public static  EntityContrat from_Tdo_To_Entity (DtoContart dto ) {
        return EntityContrat.builder()
                .id(dto.getId())
                .nameContrat(dto.getNameContrat())
                .build();
    }

}
