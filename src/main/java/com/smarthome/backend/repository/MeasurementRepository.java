package com.smarthome.backend.repository;

import com.smarthome.backend.enums.MeasurementType;
import com.smarthome.backend.model.Measurement;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeasurementRepository extends JpaRepository<Measurement, Integer> {

    List<Measurement> findByType(Pageable pageable, MeasurementType type);

    List<Measurement> findByType(MeasurementType type);

}
