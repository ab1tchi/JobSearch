<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'category' =>'required|string|max:255',
            'job_type' => 'required|string|max:50',
            'vacancy' => 'required|integer|min:1',
            'salary' => 'required|numeric|min:0',
            'location' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'benefits' => 'nullable|string|max:5000',
            'responsibility' => 'nullable|string|max:5000',
            'qualifications' => 'nullable|string|max:5000',
            'experience' => 'required|string|max:255',
            'keywords' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'company_location' => 'required|string|max:255',
            'company_website' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get the custom error messages for the validation rules.
     * @return array
     */

    public function messages(): array
    {
        return [
            // Title
            'title.required' => 'Enter a Product Name.',
            'title.string' => 'The Job Title must be a string.',
            'title.max' => 'The Job Title may not be greater than 255 characters.',

            // Category
            'category.required' => 'Select the Category of the Job.',
            'category.string' => 'The Category must be a string.',
            'category.max' => 'The Category may not be greater than 255 characters.',

            // Job Type
            'job_type.required' => 'Select the Job Type.',
            'job_type.string' => 'The Job Type must be a string.',
            'job_type.max' => 'The Job Type may not be greater than 50 characters.',

            // Vacancy
            'vacancy.required' => 'Enter the Vacancy.',
            'vacancy.integer' => 'The Vacancy must be an integer.',
            'vacancy.min' => 'The Vacancy must be at least 1.',

            // Salary
            'salary.required' => 'Enter the Salary.',
            'salary.numeric' => 'The Salary must be a number.',
            'salary.min' => 'The Salary must be at least 0.',

            // Location
            'location.required' => 'Enter the Location of the Job.',
            'location.string' => 'The Location must be a string.',
            'location.max' => 'The Location may not be greater than 255 characters.',

            // Description
            'description.required' => 'Job description is required.',
            'description.string' => 'The Job Description must be a string.',
            'description.max' => 'The Job Description may not be greater than 5000 characters.',

            // Benefits
            'benefits.string' => 'The Benefits must be a string.',
            'benefits.max' => 'The Benefits may not be greater than 5000 characters.',

            // Responsibility
            'responsibility.string' => 'The Responsibility must be a string.',
            'responsibility.max' => 'The Responsibility may not be greater than 5000 characters.',

            // Qualifications
            'qualifications.string' => 'The Qualifications must be a string.',
            'qualifications.max' => 'The Qualifications may not be greater than 5000 characters.',

            // Experience
            'experience.required' => 'Experience level is required.',
            'experience.string' => 'The Experience must be a string.',
            'experience.max' => 'The Experience may not be greater than 255 characters.',

            // Keywords
            'keywords.required' => 'Keywords are required for the job listing.',
            'keywords.string' => 'The Keywords must be a string.',
            'keywords.max' => 'The Keywords may not be greater than 255 characters.',

            // Company Name
            'company_name.required' => 'Company name is required.',
            'company_name.string' => 'The Company Name must be a string.',
            'company_name.max' => 'The Company Name may not be greater than 255 characters.',

            // Company Location
            'company_location.required' => 'Company location is required.',
            'company_location.string' => 'The Company Location must be a string.',
            'company_location.max' => 'The Company Location may not be greater than 255 characters.',

            // Website
            'company_website.string' => 'The Website must be a string.',
            'company_website.max' => 'The Website may not be greater than 255 characters.',
        ];

    }
}
