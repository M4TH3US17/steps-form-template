import React, { useEffect, useRef, useState } from 'react';
import './home-form-steps.css';
import { Person } from '../../../../../utils/objects/Person';
import S3Service from '../../../../../services/S3Service';
import { Utils } from '../../../../../utils/Utils';

interface Props {
    person: Person;
    setPerson: React.Dispatch<Person>;
};

let dataStep = new Person();

export const HomeFormStepOneComponent: React.FC<Props> = ({ person, setPerson }) => {
    const [name, setName]             = useState<string>('');
    const [lastName, setLastName]     = useState<string>('');
    const [date, setDate]             = useState<string>(''); // MANUTENCAO
    const [photograph, setPhotograph] = useState<string>('');
    const [age, setAge]               =  useState<number>(0);
    const [birthday, setBirthday] = useState<Date>();

    const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => setBirthday(new Date(e.target.value));

    useEffect(() => {
        dataStep = {name, lastName, age, photograph, birthday};
        setPerson({ ...dataStep });
    }, [name, lastName, age, photograph, birthday]);

    const photoInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = () => {
        if (photoInputRef.current && photoInputRef.current.files && photoInputRef.current.files[0]) {
            const selectedFile = photoInputRef.current.files[0];
            const imageUrl = S3Service.uploadImage(selectedFile);

            console.log(imageUrl)
        }
    };

    return (
        <div className='step step1' id='1'>
            <div className='step-content'>
                <div className='step-content-text-container'> </div>

                <div className='step-content-input-container'>
                    <div className='step-content-input-item'>
                        <label className='step-content-input-text'>Name</label>
                        <input className='step-content-input' type='text' onChange={e => setName(e.target.value)} maxLength={30}/>
                    </div>

                    <div className='step-content-input-item'>
                        <label className='step-content-input-text'>LastName</label>
                        <input className='step-content-input' type='text' onChange={e => setLastName(e.target.value)} maxLength={30} />
                    </div>

                    <div className='step-content-input-item'>
                        <label className='step-content-input-text'>Age</label>
                        <input className='step-content-input' type='text' onChange={e => setAge(Number(e.target.value))} />
                    </div>

                    <div className='step-content-input-item'>
                        <label className='step-content-input-text'>Photograph</label>
                       {/* <input className='step-content-input' type='file' accept='image/png, image/jpeg' onChange={async (e: any) => setPhotograph(await Utils.handleUpload(e) || '')} /> */}
                       <input className='step-content-input' type='file' accept='image/png, image/jpeg' ref={photoInputRef} onChange={() => handleFileChange()} />
                    </div>

                    <div className='step-content-input-item'>
                        <label className='step-content-input-text'>Birthday</label>
                        <input className='step-content-input' type='date' onChange={handleBirthdayChange} />
                    </div>

                    <div className='step-content-input-item'>
                        <label className='step-content-input-text'>Date</label>
                        <input className='step-content-input' type='text' onChange={e => setDate(e.target.value)} placeholder='__/__/__'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const HomeFormStepTwoComponent: React.FC<Props> = ({ person, setPerson }) => {
    return (
        <div className='step step2' id='2'>
            <div className='step-content'>
                <div className='step-content-text-container'>

                </div>

                <div className='step-content-input-container'>

                </div>
            </div>
            <button>a</button>
        </div>
    );
};

/*export const HomeFormStepThreeComponent = () => {
    return (
        <div className='step step3' id='3'>
            <div className='step-content'>
                <div className='step-content-text-container'>

                </div>

                <div className='step-content-input-container'>
                </div>
            </div>
        </div>
    );
};*/