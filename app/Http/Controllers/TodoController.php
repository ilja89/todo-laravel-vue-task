<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('App');
    }
}
