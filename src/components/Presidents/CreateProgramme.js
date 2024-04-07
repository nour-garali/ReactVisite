import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const CreateProgramme = () => {
    const [periodeDebut, setPeriodeDebut] = useState('');
    const [periodeFin, setPeriodeFin] = useState('');
    const [criteresEvaluation, setCriteresEvaluation] = useState('');
    const [lieu, setLieu] = useState('');
    const [description, setDescription] = useState('');
    const [contactsUrgence, setContactsUrgence] = useState('');
    const [documentsJoints, setDocumentsJoints] = useState('');
    const [selectedAdminEmail, setSelectedAdminEmail] = useState('');
    const [selectedConseillerEmails, setSelectedConseillerEmails] = useState([]);
    const [conseillersEmails, setConseillersEmails] = useState([]);
    const [adminsEmails, setAdminsEmails] = useState([]);

    useEffect(() => {
        const fetchConseillersEmails = async () => {
            try {
                const response = await axios.get('/api/conseillers-emails');
                setConseillersEmails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAdminsEmails = async () => {
            try {
                const response = await axios.get('/api/admins-emails');
                setAdminsEmails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchConseillersEmails();
        fetchAdminsEmails();
    }, []);

    const handleSubmit = async (values) => {
        // Envoyer les données du programme à votre API Flask
        try {
            const response = await axios.post('/api/programme-visite', values);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item label="Période de début" name="periode_debut">
                <Input value={periodeDebut} onChange={e => setPeriodeDebut(e.target.value)} />
            </Form.Item>
            <Form.Item label="Période de fin" name="periode_fin">
                <Input value={periodeFin} onChange={e => setPeriodeFin(e.target.value)} />
            </Form.Item>
            <Form.Item label="Critères d'évaluation" name="criteres_evaluation">
                <Input value={criteresEvaluation} onChange={e => setCriteresEvaluation(e.target.value)} />
            </Form.Item>
            <Form.Item label="Lieu" name="lieu">
                <Input value={lieu} onChange={e => setLieu(e.target.value)} />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input.TextArea value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Item>
            <Form.Item label="Contacts d'urgence" name="contacts_urgence">
                <Input value={contactsUrgence} onChange={e => setContactsUrgence(e.target.value)} />
            </Form.Item>
            <Form.Item label="Documents joints" name="documents_joints">
                <Input value={documentsJoints} onChange={e => setDocumentsJoints(e.target.value)} />
            </Form.Item>
            <Form.Item label="Email de l'administration publique" name="admin_email">
                <Select value={selectedAdminEmail} onChange={value => setSelectedAdminEmail(value)}>
                    {adminsEmails.map(email => <Option key={email} value={email}>{email}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item label="Emails des conseillers" name="conseillers_emails">
                <Select mode="tags" value={selectedConseillerEmails} onChange={value => setSelectedConseillerEmails(value)} placeholder="Sélectionnez les emails des conseillers">
                    {conseillersEmails.map(email => <Option key={email}>{email}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Créer un programme de visite</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProgramme;
