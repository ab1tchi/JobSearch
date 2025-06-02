<?php

namespace App\Http\Controllers;

use App\Models\JobList;
use App\Http\Requests\JobFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Exception;

class JobListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = JobList::all();
        return Inertia::render('joblist/joblist', [
            'jobs' => $jobs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('joblist/jobform');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobFormRequest $request)
    {
        try {
            $data = $request->validated();

            $joblist = JobList::create($data);

            return redirect()->route('joblist.index')
                ->with('success', 'Job created successfully.');
        } catch (Exception $e) {
            Log::error('Job creation failed: ' . $e->getMessage());

            return redirect()->back()
                ->withInput()
                ->with('error', 'An error occurred while creating the job. Please try again later.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $job = JobList::findOrFail($id);

        return Inertia::render('joblist/jobdetails', [
            'job' => $job,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $job = JobList::findOrFail($id);

        return Inertia::render('joblist/jobform', [
            'job' => $job,
        ]);
    }

    public function update(JobFormRequest $request, JobList $joblist)
    {
        $data = $request->validated();
        $joblist->update($data);
        return redirect()->route('joblist.index')->with('success', 'Job updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $job = JobList::findOrFail($id);
        $job->delete();

        return redirect()->route('joblist.index')->with('success', 'Job deleted successfully.');
    }
}
