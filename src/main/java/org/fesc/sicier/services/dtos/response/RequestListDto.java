package org.fesc.sicier.services.dtos.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestListDto {

    private Long id;
    private String title;
    private String description;
    private String state;
    private LocalDateTime creationDate;
    private String sender;
    private String email;
    private Long requesterId;
    private Long userDestinationId;
    private Long areaDestinationId;
}
