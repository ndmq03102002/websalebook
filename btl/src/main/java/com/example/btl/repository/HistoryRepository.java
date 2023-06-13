package com.example.btl.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.btl.model.History;

public interface HistoryRepository extends JpaRepository<History, Integer> {
	public List<History> findAllByUserId(int userId);
}
