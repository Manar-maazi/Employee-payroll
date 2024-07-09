package BulltinPeo.entity;

import BulltinPeo.dto.UtilisateurDto;
import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="Utilisateur")
public class UtilisateurEntity implements UserDetails {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePass;
    private String role;

/*

    public static UtilisateurEntity fromDtoToEntity(UtilisateurDto Dto){
        return UtilisateurEntity
                .builder()
              //  .id(Dto.getId())
                .nom(Dto.getNom())
                .prenom(Dto.getPrenom())
                .email(Dto.getEmail())
                .mot_de_pass(Dto.getMot_de_pass())
               // .role(Dto.getRole())
                .build();
    }*/


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of( new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return "";
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
