package com.jobbuddy.backend.repository;
import com.jobbuddy.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
    // JpaRespository commonly used methods
    // saveAll(): Saves all given entities.
    // getById(): Saves all given entities.
    // flush(): Flushes all pending changes to the database.
    // saveAndFlush(): save an entity and flushes changes
    // deleteAllInBatch(): Deletes multiple entities in a single batch query.


}
