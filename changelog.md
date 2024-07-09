replace maven with maven-publish

and uploadArchives block with 
publishing {
    repositories {
        maven {
            url = uri("${rootProject.projectDir}/maven-repo")
        }
    }
}