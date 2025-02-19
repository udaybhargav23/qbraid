import React, { useState } from 'react';
import { useLazyGetDevicesQuery } from '../api/deviceApi';
import { motion } from 'framer-motion';

const DeviceList = () => {
    const [fetchDevices, { data: devices = [], isLoading, error }] = useLazyGetDevicesQuery();
    const [filters, setFilters] = useState({ provider: '', type: '', status: '', isAvailable: '' });

    const handleFilterChange = (e) => {
        let { name, value } = e.target;
        if (name === "isAvailable") value = value === "true" ? true : value === "false" ? false : '';
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = async () => {
        const filteredParams = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
        );
        await fetchDevices(filteredParams);
    };

    return (
        <motion.div 
          className="device-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
            <h2>Quantum Devices</h2>
            <div className="filters d-flex gap-3">
                <select name="provider" className="form-select" onChange={handleFilterChange}>
                    <option value="">Select Provider</option>
                    <option value="AWS">AWS</option>
                    <option value="IBM">IBM</option>
                    <option value="QuEra">QuEra</option>
                    <option value="qBraid">qBraid</option>
                    <option value="Rigetti">Rigetti</option>
                    <option value="IonQ">IonQ</option>
                    <option value="OQC">OQC</option>
                </select>
                <select name="type" className="form-select" onChange={handleFilterChange}>
                    <option value="">Select Type</option>
                    <option value="QPU">QPU</option>
                    <option value="Simulator">Simulator</option>
                </select>
                <button className="btn btn-success" onClick={handleSearch}>Search</button>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching devices.</p>}
            {devices.length > 0 ? (
                <ul className="list-group mt-3">
                    {devices.map((device, index) => (
                        <li key={index} className="list-group-item">
                            <strong>{device.name}</strong> - {device.provider} ({device.type}) [{device.status}]
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No devices found.</p>
            )}
        </motion.div>
    );
};

export default DeviceList;
