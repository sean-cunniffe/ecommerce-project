package com.seanprojects.ecommerce.dao;

import com.seanprojects.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//productCategory == name of JSON entry, /product-category .. so it doesnt use the name "productCategorys"
@RepositoryRestResource(collectionResourceRel = "productCategory",path= "product-category")
@CrossOrigin("http://localhost:4200")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
