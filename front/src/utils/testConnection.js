const testConnections = async () => {
    const results = {
        authService: null,
        databaseService: null,
        token: null
    };

    try {
        // Test Auth Service
        console.log('Testing Auth Service connection...');
        try {
            const authResponse = await fetch('http://localhost:5003/auth/health');
            if (!authResponse.ok) {
                throw new Error(`Auth service responded with status: ${authResponse.status}`);
            }
            const authData = await authResponse.json();
            results.authService = {
                status: authResponse.status,
                data: authData
            };
            console.log('Auth Service response:', authData);
        } catch (authError) {
            console.error('Auth Service test failed:', authError);
            results.authService = {
                error: authError.message
            };
        }

        // Test Database Service
        console.log('Testing Database Service connection...');
        try {
            const dbResponse = await fetch('http://localhost:5001/api/health');
            if (!dbResponse.ok) {
                const errorData = await dbResponse.json().catch(() => ({}));
                throw new Error(`Database service error: ${errorData.message || dbResponse.statusText}`);
            }
            const dbData = await dbResponse.json();
            results.databaseService = {
                status: dbResponse.status,
                data: dbData
            };
            console.log('Database Service response:', dbData);
        } catch (dbError) {
            console.error('Database Service test failed:', dbError);
            results.databaseService = {
                error: dbError.message
            };
        }

        // Check token if exists
        const token = localStorage.getItem('token');
        if (token) {
            results.token = {
                exists: true,
                length: token.length,
                format: token.split('.').length === 3 ? 'valid JWT format' : 'invalid format'
            };
            console.log('Token found:', results.token);
        } else {
            results.token = { exists: false };
            console.log('No token found in localStorage');
        }

        return results;
    } catch (error) {
        console.error('Connection test failed:', error);
        return {
            ...results,
            error: error.message
        };
    }
};

export default testConnections; 