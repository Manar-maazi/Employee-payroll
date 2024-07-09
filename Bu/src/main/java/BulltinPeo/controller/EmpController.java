package BulltinPeo.controller;

import BulltinPeo.dto.EmpDto;

import BulltinPeo.service.EmpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("emp")
public class EmpController {
    @Autowired
    EmpService empService ;

    @GetMapping("All_Emp")
    public List<EmpDto> findAll() {
        return this.empService.getAllEmployees();
    }
    @GetMapping("getEmp_ID")
    public EmpDto get(@RequestParam Integer id){
        return empService.getEmpById(id);
    }
    @PostMapping("add_emp")
    public void save(@RequestBody EmpDto data){
        this.empService.InsertEmp(data);
    }
    @DeleteMapping("delete_emp")
    public void delete_emp(@RequestParam Integer id){
        this.empService.DeleteEmp(id);
    }
    @PutMapping("Update")
    public void update(@RequestBody  EmpDto empDto){
          this.empService.updateEmp(empDto);
    }


}