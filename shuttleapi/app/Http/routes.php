<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->group(['prefix' => 'api/v1', 'middleware' => 'auth:api', 'namespace' => 'App\Http\Controllers'], function() use ($app) {
    $app->get('user', 'AuthController@getAuthenticatedUser');
    $app->get('users/{id}', 'UserController@getUser');
    $app->get('users/{id}/transactions', 'UserController@getUserTransactions');
    $app->post('users/{id}', 'UserController@updateUser');
});

$app->group(['prefix' => 'api/v1', 'namespace' => 'App\Http\Controllers'], function() use ($app) {
    $app->get('users', 'UserController@index');
    $app->post('users', 'UserController@createUser');
    $app->get('transactions', 'TransactionController@index');
    $app->get('transactions/types/{id}', 'TransactionController@getTransactionsByType');    
    $app->post('transactions', 'TransactionController@createTransaction');
    $app->post('auth/login', 'AuthController@postLogin');
    $app->get('test', 'UserController@test');
});
