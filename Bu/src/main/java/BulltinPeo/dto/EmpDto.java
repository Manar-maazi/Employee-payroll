package BulltinPeo.dto;

import BulltinPeo.entity.EmpEntity;
import BulltinPeo.entity.EntityContrat;
import BulltinPeo.entity.Entreprise;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

public class EmpDto {

    private Integer Id_e;
    private String nom_e;
    private String prenom_e;
    private Integer matricul_e;
    private String fonction_e;
    private Date dateN_e;
    private String cin_e;
    private String tele_e;
    private String Ncnss_e;
    private String cimr;
    private String amo;
    private String SF_e;
    private Date dateEmb_e;
    private Integer nd_e;
    private String image;

    private Integer base;



    @ManyToOne
    @JoinColumn(name = "id_entr", nullable = false)
    private Entreprise entreprise;
    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private EntityContrat contrat;

    public static  EmpDto FromEntitytoDTO(EmpEntity entity) {
        return EmpDto.builder()
                .Id_e(entity.getId_e())
                .nom_e(entity.getNom_e())
                .prenom_e(entity.getPrenom_e())
                .matricul_e(entity.getMatricul_e())
                .fonction_e(entity.getFonction_e())
                .dateN_e(entity.getDateN_e())
                .cin_e(entity.getCin_e())
                .tele_e(entity.getTele_e())
                .Ncnss_e(entity.getNcnss_e())
                .SF_e(entity.getSF_e())
                .dateEmb_e(entity.getDateEmb_e())
                .nd_e(entity.getNd_e())
                .entreprise(entity.getEntreprise())
                .contrat(entity.getContrat())
                .image(entity.getImage())
                .base(entity.getBase())
                .amo(entity.getAmo())
                .cimr(entity.getCimr())
                .build();
    }
}
