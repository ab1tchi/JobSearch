<?php

namespace App\Http\Controllers;

use App\Models\Joblist;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $jobs = Joblist::all();                        

        return Inertia::render('welcome', [ 
            'jobs' => $jobs,
        ]);
    }
}
