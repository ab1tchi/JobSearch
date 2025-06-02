import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <div className="flex flex-col items-center">
            <span
                style={{
                    color: '#04045E',
                    fontWeight: 'bold',
                    fontSize: '3rem',
                    textDecoration: 'underline',
                    marginTop: '0.25rem',
                }}
            >
                SarakUbra
            </span>
        </div>
    );
}
