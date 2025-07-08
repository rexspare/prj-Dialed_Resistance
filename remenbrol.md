Replace 
  playImplementation "com.android.billingclient:billing-ktx:5.0.0"
  with 
    playImplementation "com.android.billingclient:billing-ktx:6.0.1"

    at node_modules>react-native-iap>android>build.gradle


Replace
    apply plugin: 'maven'
      with
    apply plugin: 'maven-publish'

Replace
uploadArchives {
    repositories {
        mavenDeployer {
            repository(url: uri("${rootProject.projectDir}/maven-repo"))
        }
    }
}

with

publishing {
    repositories {
        maven {
            url = uri("${rootProject.projectDir}/maven-repo")
        }
    }
}



<!-- MISMATCHED ARUMENTS -->


Instead of downgrading, I checked the reactNativeModule parameter mentioned at line 131.

It seems like ArrayList<HashMap<String, String>>[] packages = this.reactNativeModules, there is literally a mismatch.

Indeed reactNativeModule doesn't have brackets in his declaration.

So I changed the following line in native_modules.gradle from:

ArrayList<HashMap<String, String>>[] packages = this.reactNativeModules
to:

ArrayList<HashMap<String, String>> packages = this.reactNativeModules