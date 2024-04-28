import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './home-form-component.css';
import { HomeFormStepOneComponent, HomeFormStepTwoComponent } from './HomeFormSteps/home-form-steps';
import { Person } from '../../../../utils/objects/Person';

const HomeFormComponent = () => {
    const [person, setPerson] = useState(new Person());

    const steps = [
        { title: 'step 1', component: <HomeFormStepOneComponent person={person} setPerson={setPerson} /> },
        { title: 'step 2', component: <HomeFormStepTwoComponent person={person} setPerson={setPerson} /> },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(person);
    };

    return (
        <form className='home-form-component' onSubmit={handleSubmit}>
            <MultiStep activeStep={1} showNavigation={true} steps={steps} />
        </form>
    );
};

export default HomeFormComponent;