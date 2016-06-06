<?php

/**
 * @SWG\Info(title="My First API", version="0.1")
 */

/**
 * @SWG\Get(
 *     path="/api/resource.json",
 *     @SWG\Response(response="200", description="An example resource")
 * )
 */

defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . '/Basecontroller.php';

class Settings extends BaseController {
            
    function __construct() {
        // Call the parent constructor
        parent::__construct();
    }
    
    public function balance($eateryId=NULL) {
        $this->isEateryIdSet($eateryId);
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        //authorize the request first
        switch ($type) {
            case parent::GET:
                try {
                    log_message('debug', 'attempting to current balance of the restaurant: ');
                    $this->printResponse($this->ccurl->makeRequest("/settings/balance/".$eateryId,"GET",array()));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while making a GET request for eatery balance: ' . $eateryId);
                    http_response_code(400);
                }
                break;
        }
    }

}
