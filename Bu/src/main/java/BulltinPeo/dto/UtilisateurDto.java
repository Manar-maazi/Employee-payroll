package BulltinPeo.dto;

import BulltinPeo.entity.UtilisateurEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//@Builder
//@AllArgsConstructor
@NoArgsConstructor
@Data

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UtilisateurDto {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String nom;
    private String prenom;
    private String email ;
    private String mot_de_pass;
    private String role;
    private UtilisateurEntity Utilisateurs;
    private List<UtilisateurEntity> utilisateursList;

    public UtilisateurDto(String email, String mot_de_pass) {
        this.email  = email;
        this.mot_de_pass  = mot_de_pass;
    }

 /*   public static UtilisateurDto fromEnityoToDto(UtilisateurEntity entity){
        return UtilisateurDto
                .builder()
                .id(entity.getId())
                .nom(entity.getNom())
                .prenom(entity.getPrenom())
                .email(entity.getEmail())
                .mot_de_pass(entity.getMot_de_pass())
                .role(entity.getRole())
                .build();
    }*/
}
