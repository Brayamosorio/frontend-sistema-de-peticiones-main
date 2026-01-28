ALTER TABLE destination_inform
    ADD requested_area_destination_id BIGINT;

ALTER TABLE destination_inform
    ADD requested_user_destination BIGINT;

ALTER TABLE destination_inform
    ADD approval_observation VARCHAR(500);

ALTER TABLE destination_inform
    ADD CONSTRAINT fk_destinform_requested_area FOREIGN KEY (requested_area_destination_id) REFERENCES area (id);

ALTER TABLE destination_inform
    ADD CONSTRAINT fk_destinform_requested_user FOREIGN KEY (requested_user_destination) REFERENCES employee (id);
