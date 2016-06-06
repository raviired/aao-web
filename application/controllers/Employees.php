<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . '/Basecontroller.php';

class Employees extends BaseController {

    public function index($eateryId=NULL,$employeeId=NULL) {
    	$requestData = $this->getRequestData();
        $type = $requestData["type"];
        switch ($type){
            case parent::GET:
                try{
                    log_message('debug', 'attempting to retrieve employees: ');
                    if(isset($employeeId)){
                        $this->printResponse($this->ccurl->makeRequest("eateries" . "/" . $eateryId . "/" . "employees" . "/" . $employeeId,"GET",$requestData['data']));
                    }else{
                        $this->printResponse($this->ccurl->makeRequest("eateries" . "/" . $eateryId . "/" . "employees","GET",$requestData['data']));
                    }
                }catch(Exception $e){
                    log_message('error', 'Error happened while attempting to retrieve employee data' . $e->getMessage());
                }
                break;
            case parent::POST:
                try{
                    log_message('debug', 'attempting to insert employee: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries" . "/" . $eateryId . "/" . "employees",$type,$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while attempting to ' . $type . ' employee data:' . $e->getMessage());
                }
                break;
            case parent::PUT:
                try{
                    log_message('debug', 'attempting to insert employee: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries" . "/" . $eateryId . "/" . "employees" . "/" . $employeeId,$type,$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while attempting to ' . $type . ' employee data:' . $e->getMessage());
                }
                break;
            case parent::DELETE:
                try{
                    log_message('debug', 'attempting to insert employee: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries" . "/" . $eateryId . "/" . "employees" . "/" . $employeeId,"DELETE",$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while attempting to delete employee:' . $e->getMessage());
                }
                break;
        }
    }

}
