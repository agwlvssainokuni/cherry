name := "cherry-scala"

version := "1.0.0"

scalaVersion := "2.9.2"

scalacOptions := Seq("-deprecation", "-unchecked")

libraryDependencies ++= Seq(
	"org.scalatest" %% "scalatest" % "1.7.2" % "test"
)
