package com.seanprojects.ecommerce.config;

import com.seanprojects.ecommerce.entity.Country;
import com.seanprojects.ecommerce.entity.Product;
import com.seanprojects.ecommerce.entity.ProductCategory;
import com.seanprojects.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/*
Use this class to disable the post, put and delete http methods for out 1.0.0 release
 */
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] unsupportedActions = {HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT};

        //disable above methods

        //disable above methods for product
        disableHttpMethods(config, unsupportedActions, Product.class);
        disableHttpMethods(config, unsupportedActions, ProductCategory.class);
        disableHttpMethods(config, unsupportedActions, Country.class);
        disableHttpMethods(config, unsupportedActions, State.class);


        // call internal helper method
        exposeIds(config);

    }

    private void disableHttpMethods(RepositoryRestConfiguration config, HttpMethod[] unsupportedActions, Class<?> theClass) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(unsupportedActions)))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(unsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //get a list of all entity classes from entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        List<Class> entityClasses = new ArrayList();

        //get entity types for entities
        for (EntityType entity : entities) {
            entityClasses.add(entity.getJavaType());
        }

        //expose the entity ids for the array of entity/domain types
        Class[] domainType = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainType);

    }
}
