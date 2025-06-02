import InputError from '@/components/input-error';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ChevronLeft, Trash2 } from 'lucide-react';

const breadcrumbsCreate: BreadcrumbItem[] = [
  {
    title: 'Add Job',
    href: route('joblist.create'),
  },
];

const breadcrumbsEdit: BreadcrumbItem[] = [
  {
    title: 'Edit Job',
    href: '#',
  },
];

export default function JobForm() {
  // Get job data from the page props (for edit)
  const { job } = usePage().props as { job?: any };

  // Initialize form data - if editing, use job data, otherwise empty defaults
  const { data, setData, post, put, processing, errors, reset } = useForm({
    title: job?.title ?? '',
    category: job?.category ?? '',
    job_type: job?.job_type ?? '',
    vacancy: job?.vacancy ?? '',
    salary: job?.salary ?? '',
    location: job?.location ?? '',
    description: job?.description ?? '',
    benefits: job?.benefits ?? '',
    responsibility: job?.responsibility ?? '',
    qualifications: job?.qualifications ?? '',
    experience: job?.experience ?? '',
    keywords: job?.keywords ?? '',
    company_name: job?.company_name ?? '',
    company_location: job?.company_location ?? '',
    company_website: job?.company_website ?? '',
  });

  // Submit handler - decide between create or update
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (job) {
      // Edit mode - update job
      put(route('joblist.update', job.id), {
        onSuccess: () => {
          // Optionally reset or do something else on success
        },
      });
    } else {
      // Create mode - store new job
      post(route('joblist.store'), {
        onSuccess: () => {
          reset();
        },
      });
    }
  };

  const breadcrumbs = job ? breadcrumbsEdit : breadcrumbsCreate;
  const pageTitle = job ? 'Edit Job' : 'Add Job';

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={pageTitle} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="ml-auto">
          <Link
            className="inline-flex text-md border border-black bg-[#04045E] px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-[#FE9E01]"
            as="button"
            href={route('joblist.index')}
          >
            <ChevronLeft className='h-6  w-5'/>
            <span>Back to Job Post</span> 
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{pageTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="flex flex-col gap-4" autoComplete="off">
              <div className="grid gap-6">
                <div className="space-y-6">
                  {/* Job Details Header */}
                  <h2 className="text-xl font-semibold">Job Details</h2>

                  {/* Row 1: Title / Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="title">Title</label>
                      <Input
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Job Title"
                        className="border rounded-lg p-2 w-full"
                      />
                      <InputError message={errors.title} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        className="border rounded-lg p-2 w-full"
                      >
                        <option value="">Select a Category</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design">Design</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">Human Resources</option>
                        <option value="IT">IT & Support</option>
                      </select>
                      <InputError message={errors.category} />
                    </div>
                  </div>

                  {/* Row 2: Job Type / Vacancy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="job_type">Job Type</label>
                      <select
                        id="job_type"
                        name="job_type"
                        value={data.job_type}
                        onChange={(e) => setData('job_type', e.target.value)}
                        className="border rounded-lg p-2 w-full"
                      >
                        <option value="">Select Job Type</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                      </select>
                      <InputError message={errors.job_type} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="vacancy">Vacancy</label>
                      <Input
                        type="number"
                        id="vacancy"
                        name="vacancy"
                        value={data.vacancy}
                        onChange={(e) => setData('vacancy', e.target.value)}
                        placeholder="Vacancy"
                        className="border rounded-lg p-2 w-full"
                      />
                      <InputError message={errors.vacancy} />
                    </div>
                  </div>

                  {/* Row 3: Salary / Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="salary">Salary (PHP)</label>
                      <Input
                        type="text"
                        id="salary"
                        name="salary"
                        value={data.salary}
                        onChange={(e) => setData('salary', e.target.value)}
                        placeholder="Salary"
                        className="border rounded-lg p-2 w-full"
                      />
                      <InputError message={errors.salary} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="location">Location</label>
                      <Input
                        type="text"
                        id="location"
                        name="location"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        placeholder="Location"
                        className="border rounded-lg p-2 w-full"
                      />
                      <InputError message={errors.location} />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="description">Description</label>
                    <CustomTextarea
                      id="description"
                      name="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      rows={5}
                      placeholder="Description"
                    />
                    <InputError message={errors.description} />
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="benefits">Benefits</label>
                    <CustomTextarea
                      id="benefits"
                      name="benefits"
                      value={data.benefits}
                      onChange={(e) => setData('benefits', e.target.value)}
                      rows={4}
                      placeholder="Benefits"
                    />
                    <InputError message={errors.benefits} />
                  </div>

                  {/* Responsibility */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="responsibility">Responsibility</label>
                    <CustomTextarea
                      id="responsibility"
                      name="responsibility"
                      value={data.responsibility}
                      onChange={(e) => setData('responsibility', e.target.value)}
                      rows={4}
                      placeholder="Responsibility"
                    />
                    <InputError message={errors.responsibility} />
                  </div>

                  {/* Qualifications */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="qualifications">Qualifications</label>
                    <CustomTextarea
                      id="qualifications"
                      name="qualifications"
                      value={data.qualifications}
                      onChange={(e) => setData('qualifications', e.target.value)}
                      rows={4}
                      placeholder="Qualifications"
                    />
                    <InputError message={errors.qualifications} />
                  </div>

                  {/* Experience / Keywords */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="experience">Experience</label>
                      <select
                        id="experience"
                        name="experience"
                        value={data.experience}
                        onChange={(e) => setData('experience', e.target.value)}
                        className="border rounded-lg p-2 w-full"
                      >
                        <option value="">Select Experience</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                      <InputError message={errors.experience} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="keywords">Keywords</label>
                      <Input
                        type="text"
                        id="keywords"
                        name="keywords"
                        value={data.keywords}
                        onChange={(e) => setData('keywords', e.target.value)}
                        placeholder="Keywords"
                        className="border rounded-lg p-2 w-full"
                      />
                      <InputError message={errors.keywords} />
                    </div>
                  </div>

                  {/* Company Details Header */}
                  <h2 className="text-xl font-semibold mt-6">Company Details</h2>

                  {/* Company Name / Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="company_name">Name</label>
                      <Input
                        type="text"
                        id="company_name"
                        name="company_name"
                        value={data.company_name}
                        onChange={(e) => setData('company_name', e.target.value)}
                        placeholder="Company Name"
                        className="border rounded-lg p-2 w-full"
                      />
                      <InputError message={errors.company_name} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="company_location">Location</label>
                      <Input
                        type="text"
                        id="company_location"
                        name="company_location"
                        value={data.company_location}
                        onChange={(e) => setData('company_location', e.target.value)}
                        placeholder="Location"
                        className="border rounded-lg p-2 w-full"
                      />
                      <InputError message={errors.company_location} />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="company_website">Website</label>
                    <Input
                      type="text"
                      id="company_website"
                      name="company_website"
                      value={data.company_website}
                      onChange={(e) => setData('company_website', e.target.value)}
                      placeholder="Company Website"
                      className="border rounded-lg p-2 w-full"
                    />
                    <InputError message={errors.company_website} />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-[#04045E] px-4 py-2 rounded-lg text-white cursor-pointer hover:bg-[#FE9E01] disabled:opacity-50"
                      disabled={processing}
                    >
                      {processing ? 'Saving...' : 'Save Job'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
