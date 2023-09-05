package com.example.projekt_menedzsment.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;
@Entity
@Table(name = "upload_files")
@Getter
@Setter
public class UploadFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fileName")
    @NotNull
    private String fileName;
    @Column(name = "origName")
    @NotNull
    private String origName;

    @Column(name = "contentType")
    private String contentType;

    @Column(name = "uploaded_date")
    private LocalDate uploadedDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projekt_id")
    private Projekt projekt;

}
