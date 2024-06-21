import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import type { Author } from "next/dist/lib/metadata/types/metadata-types";
import Link from "next/link";
import WorkExperienceType from "@/types/WorkExperienceType";
import VolunteeringType from "@/types/VolunteeringType";
import EducationType from "@/types/EducationType";
import SkillType from "@/types/SkillType";
import SkillSampleType from "@/types/SkillSampleType";

export const metadata: Metadata = {
};

export default async function IndexPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    metadata.title = dictionary.pages.root.metadata.title;
    metadata.description = dictionary.pages.root.metadata.description;
    metadata.authors = { name: dictionary.pages.root.metadata.title } as Author;

    return (
        <>
            <section className="resume-section" id="about">
                <div className="resume-section-content">
                    <h1 className="mb-0">
                        {dictionary.pages.root.about.name} <span
                        className="text-primary">{dictionary.pages.root.about.surname}</span>
                    </h1>
                    <div className="subheading mb-5">
                        {dictionary.pages.root.about.header}
                        &nbsp; <i className="fa-solid fa-angles-right fa-fw"></i> &nbsp;
                        <span dangerouslySetInnerHTML={{__html: dictionary.pages.root.about.contact_me}}></span>
                    </div>
                    <p className="lead mb-5">{dictionary.pages.root.about.intro_1}</p>
                    <p className="lead mb-5">{dictionary.pages.root.about.intro_2}</p>
                    <div className="social-icons">
                        <Link className={"social-icon"} href={dictionary.social.LinkedIn} target={"_blank"}>
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link className={"social-icon"} href={dictionary.social.GitHub} target={"_blank"}>
                            <i className="fab fa-github"></i>
                        </Link>
                        <Link className={"social-icon"} href={dictionary.social.GitLab} target={"_blank"}>
                            <i className="fab fa-gitlab"></i>
                        </Link>
                        <Link className={"social-icon"} href={dictionary.social.Medium} target={"_blank"}>
                            <i className="fab fa-medium"></i>
                        </Link>
                    </div>
                </div>
            </section>
            <hr className="m-0"/>

            <section className="resume-section" id="whyme">
                <div className="resume-section-content">
                    <h2 className="mb-5">{dictionary.pages.root.why.title}</h2>
                    {dictionary.pages.root.why.items.map((reason: string, index: number) => (
                        <div key={index}>
                            <p className="mb-3">
                                <i className="fa-solid fa-angles-right fa-fw"></i>
                                <span dangerouslySetInnerHTML={{__html: reason}}></span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <hr className="m-0"/>

            <section className="resume-section" id="experience">
                <div className="resume-section-content">
                    <h2 className="mb-5">{dictionary.pages.root.experience.title}</h2>
                    {dictionary.pages.root.experience.items.map((experience: WorkExperienceType, experienceIndex: number) => (
                        <div key={experienceIndex}
                             className="d-flex flex-column flex-md-row justify-content-between mb-5">
                            <div className="flex-grow-1">
                                <h3 className="mb-0">{experience.position}</h3>
                                <div className="subheading mb-3">{experience.company}</div>
                                {experience.goals.map((goal: string, experienceGoalIndex: number) => (
                                    <div key={experienceGoalIndex}>
                                        <p className="mb-3">
                                            <i className="fa-solid fa-angles-right fa-fw"></i> {goal}
                                        </p>
                                    </div>
                                ))}
                                <div>
                                    {experience.stack.map((stack: string, experienceStackIndex: number) => (
                                        <div style={{display: "inline"}} key={experienceStackIndex}>
                                            <span
                                                className="badge text-bg-primary rounded-pill me-2">&nbsp; {stack} &nbsp;</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-shrink-0"><span className="text-primary">{experience.date}</span></div>
                        </div>
                    ))}
                </div>
            </section>
            <hr className="m-0"/>

            <section className="resume-section" id="volunteering">
                <div className="resume-section-content">
                    <h2 className="mb-5">{dictionary.pages.root.volunteering.title}</h2>
                    {dictionary.pages.root.volunteering.items.map((volunteering: VolunteeringType, volunteeringIndex: number) => (
                        <div key={volunteeringIndex}
                             className="d-flex flex-column flex-md-row justify-content-between mb-5">
                            <div className="flex-grow-1">
                                <h3 className="mb-0">{volunteering.position}</h3>
                                <div className="subheading mb-3">{volunteering.company}</div>
                                {volunteering.details.map((volunteeringDetails: string, volunteeringDetailsIndex: number) => (
                                    <div key={volunteeringDetailsIndex}>
                                        <p className="mb-3">
                                            <i className="fa-solid fa-angles-right fa-fw"></i> {volunteeringDetails}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex-shrink-0"><span className="text-primary">{volunteering.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <hr className="m-0"/>

            <section className="resume-section" id="education">
                <div className="resume-section-content">
                    <h2 className="mb-5">{dictionary.pages.root.education.title}</h2>
                    {dictionary.pages.root.education.items.map((education: EducationType, educationIndex: number) => (
                        <div key={educationIndex}
                             className="d-flex flex-column flex-md-row justify-content-between mb-5">
                            <div className="flex-grow-1">
                                <h3 className="mb-0">{education.degree}</h3>
                                <div className="subheading mb-3"
                                     dangerouslySetInnerHTML={{__html: education.school}}></div>
                                {education.details.map((educationDetails: string, educationDetailIndex: number) => (
                                    <div key={educationDetailIndex}>
                                        <p className="mb-3">
                                            <i className="fa-solid fa-angles-right fa-fw"></i>
                                            <span dangerouslySetInnerHTML={{__html: educationDetails}}></span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex-shrink-0">
                                <span className="text-primary">{education.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <hr className="m-0"/>

            <section className="resume-section" id="skills">
                <div className="resume-section-content">
                    <h2 className="mb-5">{dictionary.pages.root.skills.title}</h2>
                    {dictionary.pages.root.skills.items.map((skill: SkillType, skillIndex: number) => (
                        <div key={skillIndex}>
                            <div className="subheading mb-3">{skill.block}</div>
                            <ul className="list-inline dev-icons">
                                {skill.samples.map((skillSample: SkillSampleType, skillSampleIndex: number) => (
                                    <li key={skillSampleIndex} className="list-inline-item" title={skillSample.name}>
                                        <i className={skillSample.logo} title={skillSample.name}></i>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
