package com.seanprojects.ecommerce.dao;

import com.seanprojects.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    //method name parsed by spring to generate query

    //generates endpoints for:
    //http://localhost:8080/api/products/search/findByCategoryId?id=2

    //findBy -              Query method
    //categoryId -          Match by category id
    //@RequestParam("id) -  use this parameter value
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

}
