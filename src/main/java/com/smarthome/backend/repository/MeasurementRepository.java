package com.smarthome.backend.repository;

import com.smarthome.backend.model.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeasurementRepository extends JpaRepository<Measurement, Integer> {
}
