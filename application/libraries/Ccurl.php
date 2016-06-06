<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of curl
 *
 * @author bhavik
 */
class Ccurl {
    
    const GET = "GET";
    const POST = "POST";
    const PUT = "PUT";
    const DELETE = "DELETE";
    
    protected $apiBaseURL;
    protected $response;

    public function __construct($params) {
        $this->apiBaseURL = $params['api_base_url'];
        $this->response = array(
            'data'=>NULL,
            'code'=>NULL
        );
    }
    
    public function makeRequest($apiEndpoint,$requestType,$requestParams=array()){
        $encoded = '';
        $headers = getallheaders();
        $requestParams['accessToken'] = isset($headers['Authorization']) ? $headers['Authorization'] : null;
        foreach ($requestParams as $name => $value) {
            if(isset($value))
                $encoded .= urlencode($name) . '=' . urlencode($value) . '&';
        }
        // chop off last ampersand
        $encoded = substr($encoded, 0, strlen($encoded) - 1);
        $url = $this->apiBaseURL . $apiEndpoint;
        
        if($requestType == self::GET || $requestType == self::DELETE){
            $url .= '/?'. $encoded;
        }else{
            $url .= '/?accessToken='.$requestParams['accessToken'];
        }
        log_message("debug", "requestParams: " . print_r($requestParams,true));
        log_message("debug", "making a " . $requestType . " call to: " . $url);
        $ch = curl_init( $url);
        if($requestType === self:: POST){
            curl_setopt($ch, CURLOPT_POSTFIELDS,  $encoded);
            curl_setopt($ch, CURLOPT_POST, TRUE);
        }else if($requestType === self:: PUT){
            curl_setopt($ch, CURLOPT_POSTFIELDS,  $encoded);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
            curl_setopt($ch, CURLOPT_POST, TRUE);
        }else if($requestType === self:: GET){
            curl_setopt($ch, CURLOPT_POSTFIELDS,  $encoded);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, self::GET);
        }
        else if($requestType === self:: DELETE){
            curl_setopt($ch, CURLOPT_POSTFIELDS,  $encoded);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, self::DELETE);
        }
        
        //curl_setopt($ch, CURLOPT_HEADER, $headers);
        
        log_message("debug", "apache headers:  " . print_r($headers,true));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $this->response['data'] = curl_exec($ch);
        $this->response['code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return $this->response;
    }
    
}
