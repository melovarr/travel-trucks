import React from 'react';

const FEATURES = [
  { label: 'Automatic' },
  { label: 'AC' },
  { label: 'Petrol' },
  { label: 'Kitchen' },
  { label: 'Radio' },
];

const DETAILS = [
  { label: 'Form', value: 'Panel truck' },
  { label: 'Length', value: '5.4 m' },
  { label: 'Width', value: '2.01 m' },
  { label: 'Height', value: '2.05 m' },
  { label: 'Tank', value: '132 l' },
  { label: 'Consumption', value: '12.4l/100km' },
];

const FeaturesPanel = () => (
  <div>
    <div style={{ marginBottom: 18 }}>
      {FEATURES.map(f => (
        <span
          key={f.label}
          style={{
            border: '1px solid #ececec',
            borderRadius: 8,
            background: '#f2f4f7',
            padding: '6px 18px',
            marginRight: 12,
            display: 'inline-block',
            marginBottom: 8,
          }}
        >
          {f.label}
        </span>
      ))}
    </div>
    <div>
      <b>Vehicle details</b>
      <table>
        <tbody>
          {DETAILS.map(({ label, value }) => (
            <tr key={label}>
              <td style={{ color: '#475467', paddingRight: 16 }}>{label}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FeaturesPanel;
