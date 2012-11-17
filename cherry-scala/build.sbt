name := "cherry-scala"

version := "1.0.0"

scalaVersion := "2.9.2"

scalacOptions := List("-deprecation", "-unchecked")

libraryDependencies += 
	"org.scalatest" % 
	"scalatest_2.9.2" % 
	"1.7.2" % 
	"test"
