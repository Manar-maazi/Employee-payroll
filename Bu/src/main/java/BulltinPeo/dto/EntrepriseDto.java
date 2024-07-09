package BulltinPeo.dto;

import BulltinPeo.entity.Entreprise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor

public class EntrepriseDto {
    private Integer Id_entr;
    private String desg_entr;
    private String email_entr;
    private String adresse_entr;
    private String tele_ent;
    private String fax_ent ;
    private String logo_entr;
    private String Cnss_entr;
    private String amo_entr;
    private String cimr_entr;


    public static EntrepriseDto fromEntityToDTO(Entreprise entity){
        return EntrepriseDto
                .builder()
                .Id_entr(entity.getId_entr())
                .desg_entr(entity.getDesg_entr())
                .email_entr(entity.getEmail_entr())
                .adresse_entr(entity.getAdresse_entr())
                .tele_ent(entity.getTele_ent())
                .fax_ent(entity.getFax_ent())
                .logo_entr(entity.getLogo_entr())
                .Cnss_entr(entity.getCnss_entr())
                .amo_entr(entity.getAmo_entr())
                .cimr_entr(entity.getCimr_entr())
                .build();

    }

}
