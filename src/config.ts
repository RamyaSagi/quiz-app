interface ProjectConfig {
    PORT: string
    jwtSecret: string,
    jwtSession : {}
}

export const config: ProjectConfig = {
    PORT: process.env.PORT || '3000',
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
        session: false
    }
} 