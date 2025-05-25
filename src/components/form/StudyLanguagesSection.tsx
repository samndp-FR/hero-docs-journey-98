
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  graduated: boolean;
  gpa: string;
}

interface Language {
  language: string;
  proficiency: string;
  canRead: boolean;
  canWrite: boolean;
  canSpeak: boolean;
}

interface StudyLanguagesSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const StudyLanguagesSection: React.FC<StudyLanguagesSectionProps> = ({ data, onUpdate }) => {
  const [studyData, setStudyData] = useState({
    education: data.education || [{
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      graduated: false,
      gpa: ''
    }],
    languages: data.languages || [{
      language: '',
      proficiency: '',
      canRead: false,
      canWrite: false,
      canSpeak: false
    }],
    additionalSkills: data.additionalSkills || '',
    certifications: data.certifications || ''
  });

  const addEducation = () => {
    const newEducation: Education = {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      graduated: false,
      gpa: ''
    };
    const newEducationList = [...studyData.education, newEducation];
    const newData = { ...studyData, education: newEducationList };
    setStudyData(newData);
    onUpdate(newData);
  };

  const removeEducation = (index: number) => {
    const newEducationList = studyData.education.filter((_, i) => i !== index);
    const newData = { ...studyData, education: newEducationList };
    setStudyData(newData);
    onUpdate(newData);
  };

  const updateEducation = (index: number, field: keyof Education, value: string | boolean) => {
    const newEducationList = [...studyData.education];
    newEducationList[index] = { ...newEducationList[index], [field]: value };
    const newData = { ...studyData, education: newEducationList };
    setStudyData(newData);
    onUpdate(newData);
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      language: '',
      proficiency: '',
      canRead: false,
      canWrite: false,
      canSpeak: false
    };
    const newLanguageList = [...studyData.languages, newLanguage];
    const newData = { ...studyData, languages: newLanguageList };
    setStudyData(newData);
    onUpdate(newData);
  };

  const removeLanguage = (index: number) => {
    if (studyData.languages.length > 1) {
      const newLanguageList = studyData.languages.filter((_, i) => i !== index);
      const newData = { ...studyData, languages: newLanguageList };
      setStudyData(newData);
      onUpdate(newData);
    }
  };

  const updateLanguage = (index: number, field: keyof Language, value: string | boolean) => {
    const newLanguageList = [...studyData.languages];
    newLanguageList[index] = { ...newLanguageList[index], [field]: value };
    const newData = { ...studyData, languages: newLanguageList };
    setStudyData(newData);
    onUpdate(newData);
  };

  const handleChange = (field: string, value: string) => {
    const newData = { ...studyData, [field]: value };
    setStudyData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-muted-foreground">
        <p>Provide information about your educational background and language skills.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Education History</h3>
          
          {studyData.education.map((edu, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Education {index + 1}</h4>
                {studyData.education.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`institution-${index}`}>Institution Name</Label>
                  <Input
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    placeholder="University of Example"
                  />
                </div>

                <div>
                  <Label htmlFor={`degree-${index}`}>Degree/Diploma</Label>
                  <Select
                    value={edu.degree}
                    onValueChange={(value) => updateEducation(index, 'degree', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School Diploma</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label>
                  <Input
                    id={`fieldOfStudy-${index}`}
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <Label htmlFor={`gpa-${index}`}>GPA/Grade</Label>
                  <Input
                    id={`gpa-${index}`}
                    value={edu.gpa}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    placeholder="3.8"
                  />
                </div>

                <div>
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    disabled={!edu.graduated}
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id={`graduated-${index}`}
                      checked={edu.graduated}
                      onChange={(e) => updateEducation(index, 'graduated', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`graduated-${index}`} className="text-sm">
                      Graduated/Completed
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addEducation}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Language Skills</h3>
          
          {studyData.languages.map((lang, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Language {index + 1}</h4>
                {studyData.languages.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`language-${index}`}>Language</Label>
                  <Input
                    id={`language-${index}`}
                    value={lang.language}
                    onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                    placeholder="Spanish"
                  />
                </div>

                <div>
                  <Label htmlFor={`proficiency-${index}`}>Proficiency Level</Label>
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value) => updateLanguage(index, 'proficiency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="fluent">Fluent</SelectItem>
                      <SelectItem value="native">Native</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">Skills</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`canRead-${index}`}
                      checked={lang.canRead}
                      onChange={(e) => updateLanguage(index, 'canRead', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`canRead-${index}`} className="text-sm">Can Read</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`canWrite-${index}`}
                      checked={lang.canWrite}
                      onChange={(e) => updateLanguage(index, 'canWrite', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`canWrite-${index}`} className="text-sm">Can Write</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`canSpeak-${index}`}
                      checked={lang.canSpeak}
                      onChange={(e) => updateLanguage(index, 'canSpeak', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`canSpeak-${index}`} className="text-sm">Can Speak</Label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addLanguage}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Language</span>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Additional Information</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="certifications">Professional Certifications</Label>
              <Textarea
                id="certifications"
                value={studyData.certifications}
                onChange={(e) => handleChange('certifications', e.target.value)}
                placeholder="List any professional certifications, licenses, or credentials..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="additionalSkills">Additional Skills & Qualifications</Label>
              <Textarea
                id="additionalSkills"
                value={studyData.additionalSkills}
                onChange={(e) => handleChange('additionalSkills', e.target.value)}
                placeholder="Describe any additional skills, technical abilities, or relevant qualifications..."
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyLanguagesSection;
