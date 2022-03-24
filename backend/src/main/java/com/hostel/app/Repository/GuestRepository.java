package com.hostel.app.Repository;

import com.hostel.app.Entity.Guest;
import lombok.Getter;
import lombok.Setter;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
@Getter
@Setter
@ApplicationScoped
public class GuestRepository implements Pageable{
    @PersistenceContext
    private EntityManager em;

    public Guest findById(Long id){
        return em.find(Guest.class, id);
    }

    public List<Guest> findAll() {
        return em.createQuery("SELECT g FROM Guest g ORDER BY g.id", Guest.class).getResultList();
    }

    @Transactional
    public void save(Guest guest){
        em.persist(guest);
    }

    //Método fictício de paginação
    // Por que isso não é eficiente?
    // Reposta: Perceba que o método abaixo recorre ao banco de dados
    // duas vezes, uma para obter a listada delimitada de acordo com a
    // pagina, e outra para obter o tamanho total de usuários, o correto
    // seria resover isso tudo em apenas uma consulta, por isso o metodo
    // abaixo não é eficiente
    public Page<Guest> getPage(int pageNumber, int pageSize){
        //return "page=" + this.pageNumber + "; size=" + this.pageSize;
        List<Guest> result = em.createNativeQuery("SELECT * FROM GUEST LIMIT " + pageSize * (pageNumber - 1) + "," + pageSize, Guest.class).getResultList();
        int totalSize = this.findAll().size();
        //return em.createQuery("SELECT g FROM Guest g", Guest.class).getResultList();
        return new Page<Guest>(result, totalSize);
    }

}
