<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . '/Basecontroller.php';

class Auth extends BaseController {

    public function login() {
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        switch ($type) {
            case parent::POST:
                try {
                    $response = $this->ccurl->makeRequest("/auth/login", "POST", $_POST);
                    $responseCode = $response['code'];
                    if ($responseCode != 200) {
                        http_response_code($responseCode);
                    } else {
                        print($response['data']);
                    }
                } catch (Exception $e) {
                    log_message('error', 'Error happened while making a GET request for eatery balance: ' . $eateryId);
                    http_response_code(400);
                }
                break;
            default:
                log_message('error', 'Invalid login request type: ');
                http_response_code(400);
                break;
        }
    }
    
    public function logout() {
        $requestData = $this->getRequestData();
        $type = $requestData["type"];
        switch ($type) {
            case parent::POST:
                try {
                    $this->printResponse($this->ccurl->makeRequest("/auth/logout", "POST", $requestData['data']));
                } catch (Exception $e) {
                    log_message('error', 'Error happened while making a GET request for eatery balance: ' . $eateryId);
                    http_response_code(400);
                }
                break;
            default:
                log_message('error', 'Invalid login request type: ');
                http_response_code(400);
                break;
        }
    }

}
