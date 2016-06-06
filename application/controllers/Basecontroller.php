<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class BaseController extends CI_Controller {
    
    const PUT = "PUT";
    const GET = "GET";
    const POST = "POST";
    const DELETE = "DELETE";
    
    public function __construct() {
        parent::__construct();
        $this->config->load('config');
        $api_base_url = $this->config->item('api_base_url');
        $this->load->library('ccurl',array('api_base_url'=>$api_base_url));
    }
    
    public function isEateryIdSet($eaterId){
        if(empty($eaterId)){
            log_message("error", "-----EateryID isn't set.------");
            exit();
        }
    }


    protected function getRequestData(){
        $requestData = array();
        $requestType = $this->input->method(TRUE);
        $data = array();
        switch ($requestType){
            case self::GET:
                $data = $this->input->get();
                break;
            case self::POST:
                $data = $this->input->post();
                if(empty($data)){
                    $data = json_decode(file_get_contents("php://input",'r'),true);
                }
                break;
            case self::PUT:
                $data = json_decode(file_get_contents("php://input",'r'),true);
                //parse_str(file_get_contents("php://input",'r'), $data);
                log_message('debug', 'requestData: ' . print_r($_REQUEST,true));
                log_message('debug', 'POST: ' . print_r($_POST,true));
                break;
        }
        $requestData['type'] = $requestType;
        $requestData['data'] = $data;
        log_message('debug', 'requestData: ' . print_r($requestData,true));
        
        return $requestData;
    }
    
    protected function printResponse($response){
        $code = $response['code'];
        $responseData = $response['data'];
        http_response_code($code);
        print($responseData);
    }
    
    protected function printErrorResponse($code,$params=array()){
        http_response_code($code);
        print($params);
    }

}
