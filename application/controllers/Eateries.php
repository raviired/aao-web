<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . '/Basecontroller.php';

class Eateries extends BaseController {
    
    public function index($eateryId=NULL){
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        //authorize the request first
        switch ($type) {
            case parent::GET:
                try {
                    log_message('debug', 'Get list of restaurants: ');
                    $this->printResponse($this->ccurl->makeRequest("/eateries","GET",array()));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while getting list of restaurants');
                    $this->printErrorResponse(400,array());
                }
                break;
        }
    }

    public function details($eateryId=NULL) {
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        //authorize the request first
        switch ($type) {
            case parent::GET:
                try {
                    log_message('debug', 'attempting to retrieve restaurant basic info: ');
                    $this->printResponse($this->ccurl->makeRequest("/eateries/details/".$eateryId,"GET",array()));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while making a GET request for eatery details: '. $e->getMessage() . $eateryId);
                    http_response_code(400);
                }
                break;
            case parent::PUT:
                try {
                    log_message('debug', 'attempting to update details: ' . print_r($requestData, true));
                    log_message('debug', '$eateryId: ' . $eateryId);
                    if(isset($requestData['data']['categories'])){
                        $requestData['data']['categories'] = json_encode($requestData['data']['categories']);
                    }
                    $this->printResponse($this->ccurl->makeRequest("/eateries/details/".$eateryId,parent::PUT,  $requestData['data']));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while updating eatery details');
                    http_response_code(400);
                }
                break;
        }
    }
    
    public function cashlimits($eateryId=NULL) {
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        //authorize the request first
        switch ($type) {
            case parent::GET:
                try {
                    log_message('debug', 'attempting to retrieve restaurant basic info: ');
                    $this->printResponse($this->ccurl->makeRequest("/eateries/cashlimits/".$eateryId,"GET",array()));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while making a GET request for eatery details: ' . $eateryId);
                    http_response_code(400);
                }
                break;
        }
    }
    
    public function sppromotions($eateryId=NULL,$startDate=NULL) {
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        switch ($type) {
            case parent::POST:
                try {
                    log_message('debug', 'attempting to update sppromotions: ' . print_r($requestData, true));
                    $this->printResponse($this->ccurl->makeRequest("/eateries/cashbacks/specials/".$eateryId,parent::POST,  $requestData['data']));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while updating eatery details');
                    http_response_code(400);
                }
                break;
            case parent::DELETE:
                try {
                    if(!isset($startDate)){
                        throw new Exception("publishing date not passed");
                    }
                    log_message('debug', 'deleting sp. promotion: ' . print_r($requestData, true));
                    $this->printResponse($this->ccurl->makeRequest("/eateries/cashbacks/specials/".$eateryId."/".$startDate,parent::DELETE,  $requestData['data']));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while deleting sp. promotion:' . $e->getMessage());
                    http_response_code(400);
                }
                break;
            default:
                log_message('debug', 'publishing promotions: ' . $type . ' not found');
                break;
        }
    }
    
    public function publishpromotions($eateryId=NULL,$publishingDate=NULL) {
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        switch ($type) {
            case parent::POST:
                try {
                    log_message('debug', 'publishing promotions: ' . print_r($requestData, true));
                    $this->printResponse($this->ccurl->makeRequest("/eateries/cashbacks/publish/".$eateryId,parent::POST,  $requestData['data']));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while updating eatery details');
                    http_response_code(400);
                }
                break;
            case parent::DELETE:
                try {
                    if(!isset($publishingDate)){
                        throw new Exception("publishing date not passed");
                    }
                    log_message('debug', 'deleting published promotions: ' . print_r($requestData, true));
                    $this->printResponse($this->ccurl->makeRequest("/eateries/cashbacks/publish/".$eateryId."/".$publishingDate,parent::DELETE,  $requestData['data']));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while publishing a promotion:' . $e->getMessage());
                    http_response_code(400);
                }
                break;
            default:
                log_message('debug', 'publishing promotions: ' . $type . ' not found');
                break;
        }
    }
    
    public function defaultCashbacks($eateryId) {
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        switch ($type){
            case parent::GET:
                try{
                    log_message('debug', 'attempting to retrieve default cashbacks: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries/cashbacks/default/".$eateryId,"GET",array()));
                }catch(Exception $e){
                    log_message('error', 'Error happened while attempting to retrieve default cashbacks' . $e->getMessage());
                }
                break;
            case parent::PUT:
                try{
                    log_message('debug', 'attempting to update defaultCashbacks: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries/cashbacks/default/".$eateryId,"PUT",$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while inserting eatery details');
                }
                break;
        }
        
    }
    
    public function cashbacks($eateryId) {
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        switch ($type){
            case parent::GET:
                try{
                    log_message('debug', 'attempting to retrieve default cashbacks: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries/cashbacks/".$eateryId,"GET",$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while attempting to retrieve default cashbacks' . $e->getMessage());
                }
                break;
            case parent::POST:
                try{
                    log_message('debug', 'attempting to insert defaultCashbacks: ' . print_r($requestData['data'],true));
                    $this->printResponse($this->ccurl->makeRequest("eateries/cashbacks/".$eateryId,"POST",$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while inserting eatery details');
                    http_response_code(400);
                }
                break;
            case parent::PUT:
                try{
                    log_message('debug', 'attempting to update defaultCashbacks: ');
                    $this->printResponse($this->ccurl->makeRequest("eateries/cashbacks/default/".$eateryId,"PUT",$requestData['data']));
                }catch(Exception $e){
                    log_message('error', 'Error happened while inserting eatery details');
                }
                break;
        }
        
    }

}
