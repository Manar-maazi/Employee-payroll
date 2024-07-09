package BulltinPeo.entity;

import BulltinPeo.dto.EmpDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Date;

@Builder
@Entity
@Table(name="employee")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer Id_e;
    @NotNull
    private String nom_e;
    @NotNull
    private String prenom_e;
    @Column(nullable = false, unique = true)
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


    public static EmpEntity FromDTOtoEntity(EmpDto dtoEmp){
        return EmpEntity
                .builder()
                .Id_e(dtoEmp.getId_e())
                .nom_e(dtoEmp.getNom_e())
                .prenom_e(dtoEmp.getPrenom_e())
                .matricul_e(dtoEmp.getMatricul_e())
                .fonction_e(dtoEmp.getFonction_e())
                .dateN_e(dtoEmp.getDateN_e())
                .cin_e(dtoEmp.getCin_e())
                .tele_e(dtoEmp.getTele_e())
                .Ncnss_e(dtoEmp.getNcnss_e())
                .SF_e(dtoEmp.getSF_e())
                .dateEmb_e(dtoEmp.getDateEmb_e())
                .nd_e(dtoEmp.getNd_e())
                .entreprise(dtoEmp.getEntreprise())
                .contrat(dtoEmp.getContrat())
                .image(dtoEmp.getImage())
                .amo(dtoEmp.getAmo())
                .base(dtoEmp.getBase())
                .cimr(dtoEmp.getCimr())
                .build();
    }


}
