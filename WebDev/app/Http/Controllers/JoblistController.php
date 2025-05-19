<?php

namespace App\Http\Controllers;

use App\Models\Joblist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JoblistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = JobList::all();
        return Inertia::render('joblist/index', [
            'jobs' => $jobs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Joblist $joblist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Joblist $joblist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Joblist $joblist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Joblist $joblist)
    {
        //
    }
}
