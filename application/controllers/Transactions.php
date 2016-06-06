<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . '/Basecontroller.php';

class Transactions extends BaseController {

    public function index($eateryId=NULL) {
    	$requestData = $this->getRequestData();
        $type = $requestData["type"];
        try {
            if(!isset($eateryId)){
                throw new Exception("");
            }
        } catch (Exception $e) {
            log_message('error', 'Error happened while attempting to retrieve default cashbacks' . $e->getMessage());
        }
        switch ($type){
            case parent::GET:
                try{
                    log_message('debug', 'attempting to retrieve transactions: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries" . "/" . $eateryId . "/" . "transactions","GET",$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while attempting to retrieve transactions' . $e->getMessage());
                }
                break;
            case parent::POST:
                try{                    
                    log_message('debug', 'Attempting to add transaction ' . print_r($requestData,true));                    
                    $this->printResponse($this->ccurl->makeRequest("eateries" . "/" . $eateryId . "/" . "transactions","POST",$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while inserting transaction details');
                }
                break;
        }
    }
    
    public function validate($eateryId=NULL) {
    	$requestData = $this->getRequestData();
        $type = $requestData["type"];
        try {
            if(!isset($eateryId)){
                throw new Exception("eateryId isnt set");
            }
        } catch (Exception $e) {
            log_message('error', 'Error happened while attempting to validate transaction:' . $e->getMessage());
        }
        switch ($type){
            case parent::GET:
                try{
                    log_message('debug', 'attempting to validate transactions: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries" . "/" . $eateryId . "/" . "transactions" . "/" . "validate","GET",$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while attempting to validate transactions' . $e->getMessage());
                }
                break;
        }
    }

}
