package BulltinPeo.entity;

import BulltinPeo.dto.EntrepriseDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Entreprise")

public class Entreprise {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_entr;
    private String desg_entr;
    private String email_entr;
    private String adresse_entr;
    private String tele_ent;
    private String fax_ent ;
    private String logo_entr;
    private String Cnss_entr;
    private String amo_entr;
    private String cimr_entr;

    @OneToMany(mappedBy = "entreprise", cascade = CascadeType.ALL)
    //private List<EmpEntity> empList = new ArrayList<>();


    public static Entreprise fromDTOtoEntity(EntrepriseDto dtoEntr){
        return Entreprise
                .builder()
                .id_entr(dtoEntr.getId_entr())
                .desg_entr(dtoEntr.getDesg_entr())
                .email_entr(dtoEntr.getEmail_entr())
                .adresse_entr(dtoEntr.getAdresse_entr())
                .tele_ent(dtoEntr.getTele_ent())
                .fax_ent(dtoEntr.getFax_ent())
                .logo_entr(dtoEntr.getLogo_entr())
                .Cnss_entr(dtoEntr.getCnss_entr())
                .amo_entr(dtoEntr.getAmo_entr())
                .cimr_entr(dtoEntr.getCimr_entr())
                .build();

    }

}
