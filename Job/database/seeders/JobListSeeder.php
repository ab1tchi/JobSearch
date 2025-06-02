<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\JobList;

class JobListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $jobTitles = [
            'Software Engineer', 'Front-End Developer', 'Back-End Developer', 'Full-Stack Developer',
            'Mobile App Developer', 'DevOps Engineer', 'Database Administrator', 'IT Support Specialist',
            'QA Engineer', 'Network Administrator', 'Cybersecurity Analyst', 'Data Scientist',
            'Machine Learning Engineer', 'Cloud Architect', 'Systems Analyst',
            'UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Web Designer',
            'Art Director', 'Motion Graphics Designer', 'Creative Director',
            'Marketing Manager', 'Digital Marketing Specialist', 'Content Strategist',
            'SEO Specialist', 'Social Media Manager', 'Brand Manager', 'Business Analyst',
            'Product Manager', 'Project Manager', 'Account Manager',
            'Accountant', 'Financial Analyst', 'HR Manager', 'Payroll Specialist',
            'Recruitment Specialist', 'Bookkeeper', 'Compliance Officer',
            'Operations Manager', 'Supply Chain Analyst', 'Logistics Coordinator',
            'Warehouse Supervisor', 'Procurement Specialist', 'Facilities Manager',
            'Registered Nurse', 'Pharmacist', 'Medical Technologist', 'Radiologic Technologist',
            'Laboratory Technician', 'Physical Therapist', 'Healthcare Administrator',
            'School Teacher', 'University Lecturer', 'Instructional Designer',
            'Research Associate', 'Academic Advisor', 'Librarian',
            'Content Writer', 'Copywriter', 'Editor', 'Legal Assistant',
            'Paralegal', 'Executive Assistant', 'Office Manager', 'Translator',
            'Civil Engineer', 'Electrical Engineer', 'Mechanical Engineer', 'Architect',
            'Construction Manager', 'Plumber', 'Electrician', 'HVAC Technician', 'CNC Operator',
            'Sales Representative', 'Customer Service Agent', 'Call Center Representative',
            'Real Estate Agent', 'Retail Associate', 'Account Executive', 'Client Success Manager',
            'Nutritionist', 'Dental Assistant', 'Travel Consultant', 'Event Planner',
        ];

        $chunks = 100;

        for ($i = 0; $i < 100; $i++) {
            $data = [];

            for ($j = 0; $j < $chunks; $j++) {
                $title = $faker->randomElement($jobTitles);
                $data[] = [
                    'title' => $title,
                    'category' => $faker->randomElement(['Engineering', 'Marketing', 'Design', 'Sales', 'Human Resources', 'IT & Support']),
                    'job_type' => $faker->randomElement(['Full-time', 'Part-time', 'Contract', 'Remote']),
                    'vacancy' => $faker->numberBetween(1, 5),
                    'salary' => $faker->numberBetween(20000, 100000),
                    'location' => $faker->city,
                    'date_posted' => $faker->date(),
                    'description' => $faker->paragraph,
                    'benefits' => $faker->sentence,
                    'responsibility' => $faker->paragraph,
                    'qualifications' => $faker->sentence,
                    'experience' => $faker->numberBetween(0, 10) . ' years',
                    'keywords' => implode(', ', $faker->words(5)),
                    'company_name' => $faker->company,
                    'company_location' => $faker->city,
                    'company_website' => $faker->url,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            JobList::insert($data);

            $this->command->info("Inserted batch " . ($i + 1) . " of {$chunks} jobs");
        }
    }
}
